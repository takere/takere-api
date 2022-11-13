/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const connections = [
  { 
    "slug": "begin", 
    "connections": [
      "explanation", 
      "medication_control", 
      "orientation", 
      "quiz", 
      "reminder"
    ] 
  },
  { 
    "slug": "conditional", 
    "connections": [
      "conditional", 
      "explanation", 
      "medication_control", 
      "orientation", 
      "quiz", 
      "reminder"
    ] 
  },
  { 
    "slug": "explanation", 
    "connections": [
      "explanation", 
      "medication_control", 
      "orientation", 
      "quiz"
    ]
  },
  { 
    "slug": "medication_control", 
    "connections": [
      "conditional", 
      "explanation", 
      "medication_control", 
      "orientation", 
      "quiz", 
      "reminder"
    ] 
  },
  { 
    "slug": "orientation", 
    "connections": [
      "conditional", 
      "explanation", 
      "medication_control", 
      "orientation", 
      "quiz", 
      "reminder"
    ] 
  },
  { 
    "slug": "quiz", 
    "connections": [
      "conditional", 
      "explanation", 
      "medication_control", 
      "orientation", 
      "quiz", 
      "reminder"
    ] 
  },
  { 
    "slug": "reminder", 
    "connections": [
      "conditional", 
      "explanation", 
      "medication_control", 
      "orientation", 
      "quiz", 
      "reminder"
    ] 
  }
]

export default connections;
