export const parseFormData = (parts) => {
  const result = {
    fields: {},
    files: {}
  }

  for (const part of parts) {
    if (part.filename) {
      // File part
      result.files[part.name] = {
        filename: part.filename,
        type: part.type || 'application/octet-stream',
        data: part.data,
        size: part.data.length
      }
    } else {
      // Text field part
      const value = part.data.toString('utf8');
      
      if (result.fields[part.name]) {
        if (Array.isArray(result.fields[part.name])) {
          result.fields[part.name].push(value);
        } else {
          result.fields[part.name] = [result.fields[part.name], value];
        }
      } else {
        result.fields[part.name] = value;
      }
    }
  }

  return result;
}