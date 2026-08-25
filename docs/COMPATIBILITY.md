# Compatibility

Tested compile baseline: DSH `0.1.1-rc.2` and Cordis `4.0.1`.

The plugin depends only on ThemeRuntime, settings namespaces, declared settings
slots, locale, and WebServer exact routes. It does not replace sidebar,
conversation, or root slots and does not query DSH DOM internals.

Live integration validation remains required for Better Sidebar, dsh-context,
Agent Teams, Damage Pulse, Ubuntu/WSL2, and browser screenshot regression.
