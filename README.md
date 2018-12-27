# darmok

Tamarian programming language

## Explanation

The Tamarians (or Children of Tama) are an alien race that was featured in the 102nd episode of Star Trek: The Next Generation. They communicate exclusively through metaphor based on their own culture's lore and history, leading past Starfleet crews and the Enterprise (initially at least) to find their language completely incomprehensible.

Being a technologically advanced, post-warp culture, it stands to reason that the Tamarians would incorporate this same type of metaphorical communication into their programming languages.

## Installation

```bash
npm install darmok-lang
```

## Usage

```bash
Usage: darmok <infile.darmok> [<outfile.c>]
```

## Spec

Darmok converts directly into C. Whole lines must be in either Darmok or C. Mixing will cause problems. Darmok lines do not need a semicolon at the end. C lines do (where applicable).

(Note: `%s` indicates the text that follows the Darmok instruction)

| Darmok instruction                  | C equivalent    | Notes                 |
| ----------------------------------- | --------------- | --------------------- |
| `Temba, his arms wide`              | #include <%s.h> |                       |
| `Temba, at rest`                    | #include "%s.h" |                       |
| `Sokath, his eyes uncovered`        | #define %s      |                       |
| `Darmok on the ocean`               | int main(%s) {  |                       |
| `Darmok and Jalad at Tanagra`       | return %s;      |                       |
| `Darmok and Jalad on the ocean`     | }               | Main close bracket    |
| `Kira at Bashi`                     | printf(%s);     |                       |
| `The river Termarc in winter`       | }               | Generic close bracket |
| `Uzani, his army with fists open`   | if (%s) {       |                       |
| `Uzani, his army with fists closed` | } else {        |                       |
| `Mirab, with sails unfurled`        | for (%s) {      |                       |
| `Kiteo, his eyes closed`            | while (%s) {    |                       |
| `Chenza at court`                   | switch (%s) {   |                       |
| `the court of silence`              | }               | Switch close bracket  |
| `Shaka`                             | case %s:        |                       |
| `Zinda`                             | default:        |                       |
| `when the walls fell`               | break           |                       |

## Example

Darmok:

```
Temba, his arms wide stdio

Darmok on the ocean
    Kira at Bashi "Hello, World!\n"

    Darmok and Jalad at Tanagra 0
Darmok and Jalad on the ocean
```

C:

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");

    return 0;
}
```
