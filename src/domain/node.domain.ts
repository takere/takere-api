interface Node {
  slug: string,
  id?: string,
  name: string,
  description: string,
  type: string,
  color: string,
  icon: string,
  shape: string,
  input_list: string[],
  output_list: string[],
  content_type?: string,
  parameters: {
    slug: string,
    name: string,
    description: string,
    required: boolean,
    type: string | string[],
    options: {
      value: string,
      label: string,
      request_input?: string
    }[]
  }[],
  icons?: string[],
  arguments?: any[],
  position: any,
  flow: any
}

export default Node;
