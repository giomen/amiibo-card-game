import { amiiboResponse } from "./amiibo-response.stub"

export default {
  get: jest.fn().mockResolvedValue(amiiboResponse)
}
