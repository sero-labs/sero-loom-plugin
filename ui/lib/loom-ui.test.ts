import { describe, expect, it } from 'vitest';

import { DEFAULT_LOOM_STATE } from '../../shared/types';
import { dashboardCaptureDims } from './loom-ui';

describe('dashboardCaptureDims', () => {
  it('fits a 4K capture within the host limits without changing its aspect ratio', () => {
    expect(dashboardCaptureDims({
      ...DEFAULT_LOOM_STATE.settings,
      capture: { ...DEFAULT_LOOM_STATE.settings.capture, resolution: '4k' },
    })).toEqual({ w: 2560, h: 1440 });
  });

  it('fits portrait captures by height', () => {
    expect(dashboardCaptureDims({
      ...DEFAULT_LOOM_STATE.settings,
      capture: {
        ...DEFAULT_LOOM_STATE.settings.capture,
        resolution: 'custom',
        customWidth: 3000,
        customHeight: 4000,
      },
    })).toEqual({ w: 1200, h: 1600 });
  });
});
