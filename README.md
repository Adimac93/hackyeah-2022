# Hackyeah

## Supported platforms
- Any device which supports Chromium, Gecko or WebKit browsers.

Or
> Bellow platforms requires native implementation. See more in [native project readme](Native/README.md).
- Android 5.0 (API 21) or higher.
- iOS 11 or higher, using the latest release of Xcode.
- macOS 10.15 or higher, using Mac Catalyst.
- Windows 11 and Windows 10 version 1809 or higher, using Windows UI Library (WinUI) 3.

## Dependencies
> You must have this dependencies to host application.
- Node.js 19
- Playwright latest

## Installation
Execute bellow command in repository root path.
```
npm ci
```

## Running
Execute bellow command in repository root path.
```
npm run dev
```
After which the application should be available on [http://localhost:5173/]().

## Testing

### Commands

-   main `npm run test`
-   unit `npx vitest`
-   end-to-end `npx playwright`

### Files

Place end-to-end tests in `./tests/playwright` only!
Unit tests can be blaced in `./src/**` or `./tests/unit`

Use `<name>.test.ts` file format.
