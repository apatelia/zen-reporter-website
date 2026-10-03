# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual-regression.spec.ts >> visual regression comparison failure
- Location: tests/visual-regression.spec.ts:3:6

# Error details

```
Error: Visual regression mismatch detected! Component layout changed.

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - text: EXPECTED BASELINE
  - heading "Zen Reporter Original Design" [level=1] [ref=e3]
  - paragraph [ref=e4]: Original baseline layout and green theme!
```

# Test source

```ts
  29  |               background: #1e293b;
  30  |               padding: 32px;
  31  |               border-radius: 16px;
  32  |               border: 2px solid #334155;
  33  |               box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  34  |               text-align: center;
  35  |               max-w: 400px;
  36  |             }
  37  |             .badge {
  38  |               background: #38bdf8;
  39  |               color: #0f172a;
  40  |               font-weight: bold;
  41  |               padding: 4px 12px;
  42  |               border-radius: 9999px;
  43  |               font-size: 14px;
  44  |             }
  45  |             h1 { margin-top: 16px; font-size: 24px; color: #38bdf8; }
  46  |             p { color: #94a3b8; font-size: 14px; }
  47  |           </style>
  48  |         </head>
  49  |         <body>
  50  |           <div class="card">
  51  |             <span class="badge">ACTUAL STATE</span>
  52  |             <h1>Zen Reporter Visual Diff</h1>
  53  |             <p>This element has changed styling and content vs baseline!</p>
  54  |           </div>
  55  |         </body>
  56  |       </html>
  57  |     `);
  58  | 
  59  |     // First screenshot (Actual screenshot taken in test)
  60  |     const actualBuffer = await page.screenshot();
  61  | 
  62  |     // Create a mismatch version for Expected baseline preview
  63  |     await page.setContent(`
  64  |       <!DOCTYPE html>
  65  |       <html>
  66  |         <head>
  67  |           <style>
  68  |             body {
  69  |               margin: 0;
  70  |               padding: 40px;
  71  |               font-family: system-ui, sans-serif;
  72  |               background-color: #18181b;
  73  |               color: #f4f4f5;
  74  |               display: flex;
  75  |               flex-direction: column;
  76  |               align-items: center;
  77  |               justify-content: center;
  78  |               height: 100vh;
  79  |               box-sizing: border-box;
  80  |             }
  81  |             .card {
  82  |               background: #27272a;
  83  |               padding: 32px;
  84  |               border-radius: 16px;
  85  |               border: 2px solid #52525b;
  86  |               box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  87  |               text-align: center;
  88  |               max-w: 400px;
  89  |             }
  90  |             .badge {
  91  |               background: #22c55e;
  92  |               color: #052e16;
  93  |               font-weight: bold;
  94  |               padding: 4px 12px;
  95  |               border-radius: 9999px;
  96  |               font-size: 14px;
  97  |             }
  98  |             h1 { margin-top: 16px; font-size: 24px; color: #22c55e; }
  99  |             p { color: #a1a1aa; font-size: 14px; }
  100 |           </style>
  101 |         </head>
  102 |         <body>
  103 |           <div class="card">
  104 |             <span class="badge">EXPECTED BASELINE</span>
  105 |             <h1>Zen Reporter Original Design</h1>
  106 |             <p>Original baseline layout and green theme!</p>
  107 |           </div>
  108 |         </body>
  109 |       </html>
  110 |     `);
  111 | 
  112 |     const expectedBuffer = await page.screenshot();
  113 | 
  114 |     // Attach screenshots conforming to Playwright visual diff naming conventions
  115 |     await test.info().attach('card-snapshot-actual.png', {
  116 |       body: actualBuffer,
  117 |       contentType: 'image/png',
  118 |     });
  119 | 
  120 |     await test.info().attach('card-snapshot-expected.png', {
  121 |       body: expectedBuffer,
  122 |       contentType: 'image/png',
  123 |     });
  124 | 
  125 |     // Assert visual diff failure intentionally
  126 |     expect(
  127 |       actualBuffer.equals(expectedBuffer),
  128 |       'Visual regression mismatch detected! Component layout changed.'
> 129 |     ).toBe(true);
      |       ^ Error: Visual regression mismatch detected! Component layout changed.
  130 |   }
  131 | );
  132 | 
```