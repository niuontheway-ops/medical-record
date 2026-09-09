@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (
  start "" "http://127.0.0.1:4200/"
  node local-server.mjs
  exit /b
)
where py >nul 2>nul
if %errorlevel%==0 (
  start "" "http://127.0.0.1:4200/"
  py -m http.server 4200 --bind 127.0.0.1 --directory site
  exit /b
)
echo Node.js or Python is required to start the local version.
echo Please install Node.js, then double-click this file again.
pause
