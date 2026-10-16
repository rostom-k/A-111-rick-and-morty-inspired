@echo off
echo ===================================================
echo   A-111 : RICK AND MORTY TERMINAL EXE BUILDER
echo ===================================================
echo.
echo Installing dependencies...
pip install -r requirements.txt pyinstaller
echo.
echo Compiling A-111.exe...
pyinstaller --onefile --noconsole --name "A-111" a111_game.py
echo.
echo Compilation complete! 
echo Your executable is located in: dist\A-111.exe
echo You can zip dist\A-111.exe and upload it directly to itch.io!
pause
