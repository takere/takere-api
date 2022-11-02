interface BoardDTO {
  name: string,
  description: string,
  patientEmail: string,
  flow: string,
  node?: string,
  finished: any
}

export default BoardDTO;
