.PHONY: run

setup:
	@sudo apt install build-essential libgtk-3-dev libwebkit2gtk-4.0-dev

build-windows:
	/usr/bin/x86_64-w64-mingw32-g++ -static -static-libgcc -static-libstdc++ -std=c++17 -lstdc++fs main.cpp -DWEBVIEW_WINAPI=1 -lole32 -lcomctl32 -loleaut32 -luuid -mwindows -o Wacavex.exe

build:
	g++ -std=c++17 main.cpp -DWEBVIEW_GTK=1 `pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0` -lstdc++fs -o Wacavex

run: build
	./Wacavex
