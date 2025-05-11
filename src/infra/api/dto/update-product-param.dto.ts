import InvalidParameterException from "../../../domain/exceptions/invalid-parameter.exception";

export default class UpdateProductParamDTO {
  constructor(readonly id: string) {
    this.validate();
  }
  private validate() {
    if (!this.id) {
      throw new InvalidParameterException("Id is required");
    }
  }
}
