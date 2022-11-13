/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents a crontab based on GNU.
 * 
 * ┌────────────── second (optional)
 * │ ┌──────────── minute
 * │ │ ┌────────── hour
 * │ │ │ ┌──────── day of month
 * │ │ │ │ ┌────── month
 * │ │ │ │ │ ┌──── day of week
 * │ │ │ │ │ │
 * │ │ │ │ │ │
 * * * * * * *
 */
interface Cron {
  seconds: string | undefined,
  minute: string | undefined,
  hour: string | undefined,
  dayOfMonth: string | undefined,
  month: string | undefined,
  dayOfWeek: string | undefined
}

export default Cron;
