import rimraf from 'rimraf';
import { DIST_DIR, DIST_ZIP, ICONS_ENUM_PATH, SVG_RESULT_DIR, SVG_SYMBOLS_PATH } from './directories';

const directoriesToClean: string[] = [DIST_DIR, DIST_ZIP, SVG_RESULT_DIR, SVG_SYMBOLS_PATH, ICONS_ENUM_PATH];

// eslint-disable-next-line @typescript-eslint/no-empty-function
directoriesToClean.forEach(dir => rimraf(dir, () => {}));
