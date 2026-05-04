import langs from 'langs';

// ISO-639-3 → { code, label }
export const toLanguageObject = (code) => {
  const lang = langs.where('3', code);
  if (!lang) return { code, label: code };

  return {
    code,
    label: lang.name,
  };
};

// ISO-639-1 → ISO-639-3
export const toISO3 = (code) => {
  const lang = langs.where('1', code);
  return lang ? lang['3'] : code;
};
