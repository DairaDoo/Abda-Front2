export interface FilterParams {
  brand_name?: string;
  section_name?: string;
  color_name?: string;
  min_value?: string;
  max_value?: string;
 [key: string]: string | number | undefined;
}