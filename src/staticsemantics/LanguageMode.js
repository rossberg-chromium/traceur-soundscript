// Copyright 2015 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Enums for language mode. Strong mode implies strict mode.
export const SLOPPY_MODE = 0;
export const STRICT_MODE = 1;
export const STRONG_MODE = 2;
export const TYPED_MODE = 3;

export function findLanguageMode(statements, mode) {
  if (mode !== TYPED_MODE) {
    for (let i = 0; i < statements.length; i++) {
      if (!statements[i].isDirectivePrologue()) {
        break;
      }
      if (statements[i].isUseStrictDirective()) {
        if (mode < STRICT_MODE) {
          mode = STRICT_MODE;
        }
      } else if (statements[i].isUseStrongDirective()) {
        if (mode < STRONG_MODE) {
          mode = STRONG_MODE;
        }
      } else if (statements[i].isUseTypesDirective()) {
        mode = TYPED_MODE;
        break;  // Cannot get any stronger than this!
      }
    }
  }

  return mode;
}
