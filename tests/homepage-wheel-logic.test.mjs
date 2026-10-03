import test from "node:test";
import assert from "node:assert/strict";
import {
  getCardTapAction,
  commitWheelSelection,
  getAutoTurnDuration,
  getAutoTurnTarget,
  getSnappedIndex,
} from "../src/components/homepageWheelLogic.mjs";

test("the intentional slow turn advances exactly one card at the original pace", () => {
  assert.equal(getAutoTurnTarget(2.25), 1.25);
  assert.equal(getAutoTurnDuration(), 1 / (0.000035 * 1000));
});

test("the visual position resolves to the nearest card", () => {
  assert.equal(getSnappedIndex(1.18), 1);
  assert.equal(getSnappedIndex(-0.2), 0);
  assert.equal(getSnappedIndex(5.8), 0);
});

test("snapping honors the live card count", () => {
  assert.equal(getSnappedIndex(5.8, 8), 6);
  assert.equal(getSnappedIndex(7.1, 8), 7);
  assert.equal(commitWheelSelection(0, 6, true, 8), 6);
  assert.equal(commitWheelSelection(0, 6, false, 8), 0);
});

test("selection stays committed while motion is still in progress", () => {
  assert.equal(commitWheelSelection(1, 2.1, false), 1);
  assert.equal(commitWheelSelection(1, 2.1, true), 2);
});

test("a tap on the front card opens inspection and a tap on another card selects it", () => {
  assert.equal(getCardTapAction({ cardIndex: 2, selectedIndex: 2, moved: 0 }), "inspect");
  assert.equal(getCardTapAction({ cardIndex: 3, selectedIndex: 2, moved: 0 }), "select");
  assert.equal(getCardTapAction({ cardIndex: 2, selectedIndex: 2, moved: 18 }), "momentum");
});
