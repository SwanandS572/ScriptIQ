@echo off
setlocal enabledelayedexpansion

REM Read .env.local file
for /f "tokens=1* delims==" %%a in (.env.local) do (
    if "%%a"=="NEXT_PUBLIC_DRIZZLE_DB_URL" set "DATABASE_URL=%%b"
)

REM Remove surrounding quotes if present
set "DATABASE_URL=!DATABASE_URL:"=!"

REM Run drizzle-kit studio with the environment variable
set "DATABASE_URL=%DATABASE_URL%"
npx drizzle-kit studio --host localhost
