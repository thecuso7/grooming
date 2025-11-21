import { type ParsedFormData } from "~/types/ParsedData";
import { type MultipartData } from "~/types/ParsedData";

export const parseFormData = (parts: MultipartData[]): ParsedFormData => {
  const result: ParsedFormData  = {
    fields: {},
    files: {}
  }

  for (const part of parts) {
    if(part.name) {
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
            (result.fields[part.name] as string[]).push(value);
          } else {
            result.fields[part.name] = [result.fields[part.name] as string, value];
          }
        } else {
          result.fields[part.name] = value;
        }
      }
    }
    
  }

  return result;
}