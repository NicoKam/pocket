import { detect } from 'detect-browser';
import type React from 'react';

/** * 是否为mac系统（包含iphone手机） * */
export function isMac() {
  const info = detect();
  return info?.os === 'Mac OS' || info?.os === 'darwin';
}

export function toHotkeyStr(event: React.KeyboardEvent | KeyboardEvent) {
  const { metaKey, ctrlKey, altKey, shiftKey, key } = event;
  if (
    key === 'Command' ||
    key === 'Control' ||
    key === 'Meta' ||
    key === 'Shift' ||
    key === 'Alt'
  )
    return '';
  const keyArr: string[] = [];
  if (isMac()) {
    if (metaKey) {
      keyArr.push('Command');
    }
    if (shiftKey) {
      keyArr.push('Shift');
    }
    if (ctrlKey) {
      keyArr.push('Ctrl');
    }
    if (key.length === 1) {
      keyArr.push(key.toUpperCase());
    } else {
      keyArr.push(key);
    }
  } else {
    if (ctrlKey) {
      keyArr.push('Ctrl');
    }
    if (shiftKey) {
      keyArr.push('Shift');
    }
    if (altKey) {
      keyArr.push('Alt');
    }
    if (key.length === 1) {
      keyArr.push(key.toUpperCase());
    } else {
      keyArr.push(key);
    }
  }
  return keyArr.join('+');
}

export function divOnlyFilter(e: KeyboardEvent) {
  if (e.target?.['tagName'] === 'DIV') {
    return true;
  }
  return false;
}

export function isInput(element: HTMLElement) {
  return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
}

type HotkeyDefType = string | string[];
export type HotkeyDefsType = Record<
  string,
  [HotkeyDefType] | [HotkeyDefType, HotkeyDefType]
>;

function smartForEach<T>(
  arr: T | T[],
  callback: (item: T, index: number) => void,
) {
  if (Array.isArray(arr)) {
    arr.forEach(callback);
  } else {
    callback(arr, 0);
  }
}

/**
 * 生成热键缓存
 */
export function createHotkeyCache(hotkey: HotkeyDefsType) {
  const hotkeyMapping = new Map<string, string>();
  const macHotkeyMapping = new Map<string, string>();
  Object.entries(hotkey).forEach(([hotkeyName, commands]) => {
    const [winKeys, macKeys = winKeys] = commands;
    smartForEach(winKeys, (hotKey) => {
      if (hotkeyMapping.has(hotKey)) {
        console.warn(
          `Duplicate hot-key '${hotKey}' for command [${hotkeyName}]`,
        );
      } else {
        hotkeyMapping.set(hotKey, hotkeyName);
      }
      if (!macKeys) {
        if (macHotkeyMapping.has(hotKey)) {
          console.warn(
            `Duplicate hot-key '${hotKey}' for command(Mac) [${hotkeyName}]`,
          );
        } else {
          macHotkeyMapping.set(hotKey, hotkeyName);
        }
      }
    });
    // MacMode
    if (macKeys) {
      smartForEach(macKeys, (hotKey) => {
        if (macHotkeyMapping.has(hotKey)) {
          console.warn(
            `Duplicate hot-key '${hotKey}' for command(Mac) [${hotkeyName}]`,
          );
        } else {
          macHotkeyMapping.set(hotKey, hotkeyName);
        }
      });
    }
  });
  return { hotkeyMapping, macHotkeyMapping };
}