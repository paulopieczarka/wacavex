// main.c
#define WEBVIEW_IMPLEMENTATION
#include <iostream>
#include <stdio.h>
#include <string>
#include <filesystem>
#include "webview.h"

#ifdef WIN32
int WINAPI WinMain(HINSTANCE hInt, HINSTANCE hPrevInst, LPSTR lpCmdLine,
                   int nCmdShow) {
#else
int main() {
#endif
  std::filesystem::path path = std::filesystem::current_path();

  std::cout << path.c_str() << std::endl;

  std::string game("file://");
  game.append(path.string());
  game.append("/game/dist/index.html");

  std::cout << game << std::endl;
  /* Open wikipedia in a 800x600 resizable window */
  webview("The Wacavex", game.c_str(), 800, 600, 1);
  return 0;
}
