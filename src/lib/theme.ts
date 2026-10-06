/**
 * Theme handling. The site is designed dark-first; visitors can switch to the light
 * theme with the header toggle, and the choice is remembered in localStorage.
 */
export type Theme = "dark" | "light";
export const THEME_KEY = "mm-theme";
export const THEME_COLORS: Record<Theme, string> = { dark: "#0c0d0f", light: "#f7f5f0" };

/** Inline <head> script: applies the saved theme before first paint (no flash). */
export const themeBootScript = `try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'){document.documentElement.setAttribute('data-theme','light');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','${THEME_COLORS.light}')}}catch(e){}`;
