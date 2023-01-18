#! /usr/bin/python3

import sched, throttle, time
from datetime import datetime
from evdev import InputDevice
from select import select
from multiprocessing import Process, Value


def fade_brightness(check_brightness, target_brightness):
  if current_brightness.value != target_brightness.value:
    if current_brightness.value > target_brightness.value:
      current_brightness.value -= 1
    else:
      current_brightness.value += 1

    file = open("/sys/class/backlight/rpi_backlight/brightness", "w")
    file.write(str(current_brightness.value))
    file.close()

    time.sleep(0.01)

  if current_brightness.value != target_brightness.value:
    fade_brightness(current_brightness, target_brightness)


@throttle.wrap(10, 1)
def set_brightness(brightness, current_brightness, target_brightness):
  target_brightness.value = brightness

  fade_brightness(current_brightness, target_brightness)


def check_brightness(sc, current_brightness, target_brightness):
  now = datetime.now()
  time = (now.hour * 100) + now.minute

  if time < 830 or time > 2200:
    set_brightness(10, current_brightness, target_brightness)
  else:
    set_brightness(255, current_brightness, target_brightness)

  sc.enter(10, 1, check_brightness, (sc, current_brightness, target_brightness))


def scheduled_brightness(current_brightness, target_brightness):
  s = sched.scheduler(time.time, time.sleep)
  s.enter(10, 1, check_brightness, (s, current_brightness, target_brightness))
  s.run()


def pointer_events(current_brightness, target_brightness):
  dev = InputDevice('/dev/input/event0')

  for event in dev.read_loop():
    set_brightness(255, current_brightness, target_brightness)


if __name__=='__main__':
  file = open("/sys/class/backlight/rpi_backlight/brightness", "r")

  current_brightness = Value('i', int(file.read()))
  target_brightness = Value('i', 255)

  p1 = Process(target=scheduled_brightness, args=(current_brightness, target_brightness))
  p1.start()
  p2 = Process(target=pointer_events, args=(current_brightness, target_brightness))
  p2.start()
