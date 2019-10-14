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
  
  struct webview window = {
		.url = game.c_str(),
		.title = "The Wacavex",
		.width = 1024,
		.height = 728,
		.resizable = 1,
    .debug = 1
	};

  webview_init(&window);

  #if defined(WEBVIEW_GTK)
    WebKitSettings *settings = webkit_web_view_get_settings(WEBKIT_WEB_VIEW(window.priv.webview));
    webkit_settings_set_enable_webgl(settings, 1);
    webkit_settings_set_enable_accelerated_2d_canvas(settings, 1);
    webkit_settings_set_hardware_acceleration_policy(settings, WEBKIT_HARDWARE_ACCELERATION_POLICY_ON_DEMAND);
    webkit_settings_set_enable_write_console_messages_to_stdout(settings, 1);
  #endif

  while (webview_loop(&window, 1) == 0);

  webview_exit(&window);
  return 0;
}
