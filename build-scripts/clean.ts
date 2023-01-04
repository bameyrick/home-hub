import rimraf from 'rimraf';
import { DIST_DIR, ICONS_ENUM_PATH, SVG_RESULT_DIR, SVG_SYMBOLS_PATH } from './directories';

const directoriesToClean: string[] = [DIST_DIR, SVG_RESULT_DIR, SVG_SYMBOLS_PATH, ICONS_ENUM_PATH];

// eslint-disable-next-line @typescript-eslint/no-empty-function
directoriesToClean.forEach(dir => rimraf(dir, () => {}));
