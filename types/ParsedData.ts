export interface ParsedFile {
  filename: string;
  type: string;
  data: Buffer;
  size: number;
}

export interface ParsedFormData {
  fields: Record<string, string | string[]>;
  files: Record<string, ParsedFile>;
}

export interface MultipartData {
  name?: string;
  filename?: string;        // присутствует для файлов
  type?: string;            // MIME-тип для файлов
  data: Buffer; // содержимое поля или файла
}