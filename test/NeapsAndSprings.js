/* eslint-env mocha,node */

import { assert } from "chai";
import Tide from "../src/Tide.js";
import Day from "../src/Day.js";
import findNeapsAndSprings from "../src/NeapsAndSprings.js";

const tides = [
  new Day(
    new Date("2026-01-01T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-01T03:24:00.000Z"), 2.05, false),
      new Tide(new Date("2026-01-01T09:02:00.000Z"), 8.34, true),
      new Tide(new Date("2026-01-01T15:57:00.000Z"), 1.96, false),
      new Tide(new Date("2026-01-01T21:29:00.000Z"), 8.48, true)
    ]),
  new Day(
    new Date("2026-01-02T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-02T04:25:00.000Z"), 1.77, false),
      new Tide(new Date("2026-01-02T09:56:00.000Z"), 8.7, true),
      new Tide(new Date("2026-01-02T16:55:00.000Z"), 1.52, false),
      new Tide(new Date("2026-01-02T22:23:00.000Z"), 8.72, true)
    ]),
  new Day(
    new Date("2026-01-03T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-03T05:19:00.000Z"), 1.51, false),
      new Tide(new Date("2026-01-03T10:47:00.000Z"), 9.02, true),
      new Tide(new Date("2026-01-03T17:47:00.000Z"), 1.15, false),
      new Tide(new Date("2026-01-03T23:14:00.000Z"), 8.88, true)
    ]),
  new Day(
    new Date("2026-01-04T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-04T06:08:00.000Z"), 1.35, false),
      new Tide(new Date("2026-01-04T11:35:00.000Z"), 9.24, true),
      new Tide(new Date("2026-01-04T18:35:00.000Z"), 0.93, false)
    ]),
  new Day(
    new Date("2026-01-05T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-05T00:02:00.000Z"), 8.92, true),
      new Tide(new Date("2026-01-05T06:53:00.000Z"), 1.3, false),
      new Tide(new Date("2026-01-05T12:21:00.000Z"), 9.32, true),
      new Tide(new Date("2026-01-05T19:20:00.000Z"), 0.87, false)
    ]),
  new Day(
    new Date("2026-01-06T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-06T00:48:00.000Z"), 8.84, true),
      new Tide(new Date("2026-01-06T07:36:00.000Z"), 1.39, false),
      new Tide(new Date("2026-01-06T13:06:00.000Z"), 9.25, true),
      new Tide(new Date("2026-01-06T20:03:00.000Z"), 0.98, false)
    ]),
  new Day(
    new Date("2026-01-07T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-07T01:34:00.000Z"), 8.64, true),
      new Tide(new Date("2026-01-07T08:17:00.000Z"), 1.59, false),
      new Tide(new Date("2026-01-07T13:50:00.000Z"), 9.05, true),
      new Tide(new Date("2026-01-07T20:44:00.000Z"), 1.24, false)
    ]),
  new Day(
    new Date("2026-01-08T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-08T02:19:00.000Z"), 8.35, true),
      new Tide(new Date("2026-01-08T08:57:00.000Z"), 1.86, false),
      new Tide(new Date("2026-01-08T14:35:00.000Z"), 8.72, true),
      new Tide(new Date("2026-01-08T21:25:00.000Z"), 1.6, false)
    ]),
  new Day(
    new Date("2026-01-09T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-09T03:05:00.000Z"), 8, true),
      new Tide(new Date("2026-01-09T09:37:00.000Z"), 2.2, false),
      new Tide(new Date("2026-01-09T15:23:00.000Z"), 8.31, true),
      new Tide(new Date("2026-01-09T22:06:00.000Z"), 2.02, false)
    ]),
  new Day(
    new Date("2026-01-10T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-10T03:54:00.000Z"), 7.63, true),
      new Tide(new Date("2026-01-10T10:19:00.000Z"), 2.55, false),
      new Tide(new Date("2026-01-10T16:14:00.000Z"), 7.86, true),
      new Tide(new Date("2026-01-10T22:50:00.000Z"), 2.44, false)
    ]),
  new Day(
    new Date("2026-01-11T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-11T04:48:00.000Z"), 7.3, true),
      new Tide(new Date("2026-01-11T11:05:00.000Z"), 2.88, false),
      new Tide(new Date("2026-01-11T17:12:00.000Z"), 7.46, true),
      new Tide(new Date("2026-01-11T23:38:00.000Z"), 2.82, false)
    ]),
  new Day(
    new Date("2026-01-12T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-12T05:49:00.000Z"), 7.06, true),
      new Tide(new Date("2026-01-12T11:59:00.000Z"), 3.15, false),
      new Tide(new Date("2026-01-12T18:15:00.000Z"), 7.17, true)
    ]),
  new Day(
    new Date("2026-01-13T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-13T00:34:00.000Z"), 3.1, false),
      new Tide(new Date("2026-01-13T06:52:00.000Z"), 6.99, true),
      new Tide(new Date("2026-01-13T13:04:00.000Z"), 3.29, false),
      new Tide(new Date("2026-01-13T19:20:00.000Z"), 7.06, true)
    ]),
  new Day(
    new Date("2026-01-14T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-14T01:40:00.000Z"), 3.2, false),
      new Tide(new Date("2026-01-14T07:53:00.000Z"), 7.09, true),
      new Tide(new Date("2026-01-14T14:17:00.000Z"), 3.23, false),
      new Tide(new Date("2026-01-14T20:19:00.000Z"), 7.12, true)
    ]),
  new Day(
    new Date("2026-01-15T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-15T02:47:00.000Z"), 3.11, false),
      new Tide(new Date("2026-01-15T08:46:00.000Z"), 7.32, true),
      new Tide(new Date("2026-01-15T15:22:00.000Z"), 2.98, false),
      new Tide(new Date("2026-01-15T21:10:00.000Z"), 7.3, true)
    ]),
  new Day(
    new Date("2026-01-16T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-16T03:45:00.000Z"), 2.85, false),
      new Tide(new Date("2026-01-16T09:33:00.000Z"), 7.63, true),
      new Tide(new Date("2026-01-16T16:15:00.000Z"), 2.62, false),
      new Tide(new Date("2026-01-16T21:55:00.000Z"), 7.57, true)
    ]),
  new Day(
    new Date("2026-01-17T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-17T04:33:00.000Z"), 2.53, false),
      new Tide(new Date("2026-01-17T10:14:00.000Z"), 7.99, true),
      new Tide(new Date("2026-01-17T17:00:00.000Z"), 2.23, false),
      new Tide(new Date("2026-01-17T22:34:00.000Z"), 7.87, true)
    ]),
  new Day(
    new Date("2026-01-18T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-18T05:14:00.000Z"), 2.19, false),
      new Tide(new Date("2026-01-18T10:51:00.000Z"), 8.34, true),
      new Tide(new Date("2026-01-18T17:40:00.000Z"), 1.86, false),
      new Tide(new Date("2026-01-18T23:11:00.000Z"), 8.18, true)
    ]),
  new Day(
    new Date("2026-01-19T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-19T05:53:00.000Z"), 1.89, false),
      new Tide(new Date("2026-01-19T11:26:00.000Z"), 8.69, true),
      new Tide(new Date("2026-01-19T18:17:00.000Z"), 1.54, false),
      new Tide(new Date("2026-01-19T23:46:00.000Z"), 8.46, true)
    ]),
  new Day(
    new Date("2026-01-20T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-20T06:30:00.000Z"), 1.65, false),
      new Tide(new Date("2026-01-20T12:01:00.000Z"), 8.98, true),
      new Tide(new Date("2026-01-20T18:54:00.000Z"), 1.31, false)
    ]),
  new Day(
    new Date("2026-01-21T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-21T00:22:00.000Z"), 8.69, true),
      new Tide(new Date("2026-01-21T07:06:00.000Z"), 1.51, false),
      new Tide(new Date("2026-01-21T12:38:00.000Z"), 9.2, true),
      new Tide(new Date("2026-01-21T19:30:00.000Z"), 1.18, false)
    ]),
  new Day(
    new Date("2026-01-22T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-22T00:59:00.000Z"), 8.83, true),
      new Tide(new Date("2026-01-22T07:42:00.000Z"), 1.47, false),
      new Tide(new Date("2026-01-22T13:15:00.000Z"), 9.31, true),
      new Tide(new Date("2026-01-22T20:07:00.000Z"), 1.17, false)
    ]),
  new Day(
    new Date("2026-01-23T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-23T01:38:00.000Z"), 8.84, true),
      new Tide(new Date("2026-01-23T08:19:00.000Z"), 1.54, false),
      new Tide(new Date("2026-01-23T13:56:00.000Z"), 9.26, true),
      new Tide(new Date("2026-01-23T20:46:00.000Z"), 1.29, false)
    ]),
  new Day(
    new Date("2026-01-24T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-24T02:21:00.000Z"), 8.71, true),
      new Tide(new Date("2026-01-24T08:59:00.000Z"), 1.72, false),
      new Tide(new Date("2026-01-24T14:40:00.000Z"), 9.05, true),
      new Tide(new Date("2026-01-24T21:28:00.000Z"), 1.54, false)
    ]),
  new Day(
    new Date("2026-01-25T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-25T03:07:00.000Z"), 8.44, true),
      new Tide(new Date("2026-01-25T09:44:00.000Z"), 2.01, false),
      new Tide(new Date("2026-01-25T15:29:00.000Z"), 8.67, true),
      new Tide(new Date("2026-01-25T22:16:00.000Z"), 1.9, false)
    ]),
  new Day(
    new Date("2026-01-26T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-26T04:01:00.000Z"), 8.07, true),
      new Tide(new Date("2026-01-26T10:35:00.000Z"), 2.37, false),
      new Tide(new Date("2026-01-26T16:28:00.000Z"), 8.21, true),
      new Tide(new Date("2026-01-26T23:13:00.000Z"), 2.31, false)
    ]),
  new Day(
    new Date("2026-01-27T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-27T05:05:00.000Z"), 7.7, true),
      new Tide(new Date("2026-01-27T11:40:00.000Z"), 2.7, false),
      new Tide(new Date("2026-01-27T17:38:00.000Z"), 7.79, true)
    ]),
  new Day(
    new Date("2026-01-28T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-28T00:24:00.000Z"), 2.65, false),
      new Tide(new Date("2026-01-28T06:21:00.000Z"), 7.51, true),
      new Tide(new Date("2026-01-28T13:04:00.000Z"), 2.86, false),
      new Tide(new Date("2026-01-28T18:58:00.000Z"), 7.62, true)
    ]),
  new Day(
    new Date("2026-01-29T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-29T01:51:00.000Z"), 2.74, false),
      new Tide(new Date("2026-01-29T07:39:00.000Z"), 7.63, true),
      new Tide(new Date("2026-01-29T14:35:00.000Z"), 2.63, false),
      new Tide(new Date("2026-01-29T20:15:00.000Z"), 7.76, true)
    ]),
  new Day(
    new Date("2026-01-30T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-30T03:13:00.000Z"), 2.47, false),
      new Tide(new Date("2026-01-30T08:48:00.000Z"), 8.01, true),
      new Tide(new Date("2026-01-30T15:50:00.000Z"), 2.09, false),
      new Tide(new Date("2026-01-30T21:21:00.000Z"), 8.11, true)
    ]),
  new Day(
    new Date("2026-01-31T00:00:00.000Z"),
    [
      new Tide(new Date("2026-01-31T04:18:00.000Z"), 2.01, false),
      new Tide(new Date("2026-01-31T09:47:00.000Z"), 8.51, true),
      new Tide(new Date("2026-01-31T16:49:00.000Z"), 1.48, false),
      new Tide(new Date("2026-01-31T22:18:00.000Z"), 8.51, true)
    ]),
  new Day(
    new Date("2026-02-01T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-01T05:11:00.000Z"), 1.56, false),
      new Tide(new Date("2026-02-01T10:39:00.000Z"), 8.99, true),
      new Tide(new Date("2026-02-01T17:38:00.000Z"), 0.97, false),
      new Tide(new Date("2026-02-01T23:08:00.000Z"), 8.85, true)
    ]),
  new Day(
    new Date("2026-02-02T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-02T05:57:00.000Z"), 1.22, false),
      new Tide(new Date("2026-02-02T11:25:00.000Z"), 9.36, true),
      new Tide(new Date("2026-02-02T18:22:00.000Z"), 0.65, false),
      new Tide(new Date("2026-02-02T23:53:00.000Z"), 9.05, true)
    ]),
  new Day(
    new Date("2026-02-03T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-03T06:38:00.000Z"), 1.05, false),
      new Tide(new Date("2026-02-03T12:09:00.000Z"), 9.55, true),
      new Tide(new Date("2026-02-03T19:03:00.000Z"), 0.57, false)
    ]),
  new Day(
    new Date("2026-02-04T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-04T00:34:00.000Z"), 9.09, true),
      new Tide(new Date("2026-02-04T07:16:00.000Z"), 1.06, false),
      new Tide(new Date("2026-02-04T12:50:00.000Z"), 9.54, true),
      new Tide(new Date("2026-02-04T19:40:00.000Z"), 0.7, false)
    ]),
  new Day(
    new Date("2026-02-05T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-05T01:14:00.000Z"), 8.96, true),
      new Tide(new Date("2026-02-05T07:52:00.000Z"), 1.22, false),
      new Tide(new Date("2026-02-05T13:29:00.000Z"), 9.35, true),
      new Tide(new Date("2026-02-05T20:16:00.000Z"), 1.02, false)
    ]),
  new Day(
    new Date("2026-02-06T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-06T01:52:00.000Z"), 8.69, true),
      new Tide(new Date("2026-02-06T08:27:00.000Z"), 1.52, false),
      new Tide(new Date("2026-02-06T14:07:00.000Z"), 8.98, true),
      new Tide(new Date("2026-02-06T20:50:00.000Z"), 1.46, false)
    ]),
  new Day(
    new Date("2026-02-07T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-07T02:29:00.000Z"), 8.32, true),
      new Tide(new Date("2026-02-07T09:00:00.000Z"), 1.91, false),
      new Tide(new Date("2026-02-07T14:45:00.000Z"), 8.48, true),
      new Tide(new Date("2026-02-07T21:24:00.000Z"), 1.96, false)
    ]),
  new Day(
    new Date("2026-02-08T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-08T03:08:00.000Z"), 7.87, true),
      new Tide(new Date("2026-02-08T09:35:00.000Z"), 2.34, false),
      new Tide(new Date("2026-02-08T15:26:00.000Z"), 7.92, true),
      new Tide(new Date("2026-02-08T21:59:00.000Z"), 2.48, false)
    ]),
  new Day(
    new Date("2026-02-09T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-09T03:50:00.000Z"), 7.41, true),
      new Tide(new Date("2026-02-09T10:14:00.000Z"), 2.79, false),
      new Tide(new Date("2026-02-09T16:12:00.000Z"), 7.34, true),
      new Tide(new Date("2026-02-09T22:39:00.000Z"), 2.96, false)
    ]),
  new Day(
    new Date("2026-02-10T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-10T04:40:00.000Z"), 6.98, true),
      new Tide(new Date("2026-02-10T11:01:00.000Z"), 3.21, false),
      new Tide(new Date("2026-02-10T17:10:00.000Z"), 6.84, true),
      new Tide(new Date("2026-02-10T23:30:00.000Z"), 3.37, false)
    ]),
  new Day(
    new Date("2026-02-11T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-11T05:47:00.000Z"), 6.68, true),
      new Tide(new Date("2026-02-11T12:04:00.000Z"), 3.53, false),
      new Tide(new Date("2026-02-11T18:26:00.000Z"), 6.56, true)
    ]),
  new Day(
    new Date("2026-02-12T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-12T00:40:00.000Z"), 3.61, false),
      new Tide(new Date("2026-02-12T07:06:00.000Z"), 6.65, true),
      new Tide(new Date("2026-02-12T13:28:00.000Z"), 3.58, false),
      new Tide(new Date("2026-02-12T19:43:00.000Z"), 6.6, true)
    ]),
  new Day(
    new Date("2026-02-13T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-13T02:05:00.000Z"), 3.54, false),
      new Tide(new Date("2026-02-13T08:14:00.000Z"), 6.91, true),
      new Tide(new Date("2026-02-13T14:51:00.000Z"), 3.29, false),
      new Tide(new Date("2026-02-13T20:45:00.000Z"), 6.91, true)
    ]),
  new Day(
    new Date("2026-02-14T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-14T03:17:00.000Z"), 3.17, false),
      new Tide(new Date("2026-02-14T09:08:00.000Z"), 7.36, true),
      new Tide(new Date("2026-02-14T15:51:00.000Z"), 2.77, false),
      new Tide(new Date("2026-02-14T21:33:00.000Z"), 7.36, true)
    ]),
  new Day(
    new Date("2026-02-15T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-15T04:10:00.000Z"), 2.65, false),
      new Tide(new Date("2026-02-15T09:51:00.000Z"), 7.88, true),
      new Tide(new Date("2026-02-15T16:37:00.000Z"), 2.2, false),
      new Tide(new Date("2026-02-15T22:14:00.000Z"), 7.87, true)
    ]),
  new Day(
    new Date("2026-02-16T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-16T04:53:00.000Z"), 2.13, false),
      new Tide(new Date("2026-02-16T10:30:00.000Z"), 8.42, true),
      new Tide(new Date("2026-02-16T17:17:00.000Z"), 1.66, false),
      new Tide(new Date("2026-02-16T22:51:00.000Z"), 8.36, true)
    ]),
  new Day(
    new Date("2026-02-17T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-17T05:31:00.000Z"), 1.67, false),
      new Tide(new Date("2026-02-17T11:05:00.000Z"), 8.93, true),
      new Tide(new Date("2026-02-17T17:54:00.000Z"), 1.22, false),
      new Tide(new Date("2026-02-17T23:26:00.000Z"), 8.8, true)
    ]),
  new Day(
    new Date("2026-02-18T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-18T06:08:00.000Z"), 1.33, false),
      new Tide(new Date("2026-02-18T11:40:00.000Z"), 9.35, true),
      new Tide(new Date("2026-02-18T18:30:00.000Z"), 0.91, false)
    ]),
  new Day(
    new Date("2026-02-19T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-19T00:01:00.000Z"), 9.13, true),
      new Tide(new Date("2026-02-19T06:43:00.000Z"), 1.12, false),
      new Tide(new Date("2026-02-19T12:16:00.000Z"), 9.63, true),
      new Tide(new Date("2026-02-19T19:06:00.000Z"), 0.78, false)
    ]),
  new Day(
    new Date("2026-02-20T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-20T00:37:00.000Z"), 9.31, true),
      new Tide(new Date("2026-02-20T07:18:00.000Z"), 1.07, false),
      new Tide(new Date("2026-02-20T12:53:00.000Z"), 9.74, true),
      new Tide(new Date("2026-02-20T19:42:00.000Z"), 0.82, false)
    ]),
  new Day(
    new Date("2026-02-21T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-21T01:15:00.000Z"), 9.31, true),
      new Tide(new Date("2026-02-21T07:54:00.000Z"), 1.18, false),
      new Tide(new Date("2026-02-21T13:32:00.000Z"), 9.63, true),
      new Tide(new Date("2026-02-21T20:19:00.000Z"), 1.05, false)
    ]),
  new Day(
    new Date("2026-02-22T00:00:00.000Z"),
    [
      new Tide(new Date("2026-02-22T01:55:00.000Z"), 9.11, true),
      new Tide(new Date("2026-02-22T08:33:00.000Z"), 1.44, false),
      new Tide(new Date("2026-02-22T14:14:00.000Z"), 9.3, true),
      new Tide(new Date("2026-02-22T20:59:00.000Z"), 1.45, false)
    ])
];

describe("NeapsAndSprings", () => {
  it ("neaps and springs", () => {
    findNeapsAndSprings(tides);
    const ns = tides.filter(t => t.type === -1);
    assert.equal(ns.length, 3);
    assert.equal(ns[0].date.toISOString(), "2026-01-14T00:00:00.000Z");
    assert.equal(ns[1].date.toISOString(), "2026-01-28T00:00:00.000Z");
    assert.equal(ns[2].date.toISOString(), "2026-02-12T00:00:00.000Z");
    const sp = tides.filter(t => t.type === 1);
    assert.equal(sp.length, 3);
    assert.equal(sp[0].date.toISOString(), "2026-01-05T00:00:00.000Z");
    assert.equal(sp[1].date.toISOString(), "2026-01-22T00:00:00.000Z");
    assert.equal(sp[2].date.toISOString(), "2026-02-03T00:00:00.000Z");
  });
});
