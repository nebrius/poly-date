/*
Copyright (c) Bryan Hughes <bryan@nebri.us>

This file is part of Home Lights.

Home Lights is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Home Lights is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Home Lights.  If not, see <http://www.gnu.org/licenses/>.
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lookupItem<K, T extends Record<string, any>>(
  id: K,
  items: T[],
  lookup?: ((item: T) => boolean) | string
): T | undefined {
  if (!lookup) {
    lookup = (item) => item.id === id;
  }
  if (typeof lookup === 'string') {
    const key = lookup;
    lookup = (item) => item[key] === id;
  }
  return items.find(lookup);
}

/**
 * Checks whether or not an item an item exists in the array that matches the
 * supplied item ID.
 *
 * @param id The ID of the item to search for
 * @param items The list of items to search
 * @param lookup Either the name of the ID property on each item in the list to
 *   test against, or a test function that receives the item and returns whether
 *   or not it matches. Default is "id"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasItem<K, T extends Record<string, any>>(
  id: K,
  items: T[],
  lookup?: ((item: T) => boolean) | string
): boolean {
  return !!lookupItem(id, items, lookup);
}

/**
 * Retrieves an item from array that matches the supplied item ID, or throws an
 * error if it's not found.
 *
 * @param id The ID of the item to search for
 * @param items The list of items to search
 * @param lookup Either the name of the ID property on each item in the list to
 *   test against, or a test function that receives the item and returns whether
 *   or not it matches. Default is "id"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getItem<K, T extends Record<string, any>>(
  id: K,
  items: T[],
  lookup?: ((item: T) => boolean) | string
): T {
  const item = lookupItem(id, items, lookup);
  if (!item) {
    throw new Error(`Internal Error: could not find item ${id}`);
  }
  return item;
}

/**
 * Delays for `time` milliseconds
 */
export async function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
