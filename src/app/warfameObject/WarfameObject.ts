export abstract class WarframeObject {
  static ImageCdnUrl = 'https://cdn.warframestat.us/img/';
  uniqueName: string;
  name: string;
  imageName: string;
  description: string;
  recipeComponents: WarframeObject[] = [];
  resourceComponents: WarframeObject[] = [];
  primeComponents: WarframeObject[] = [];

  getAllComponents(): WarframeObject[] {
    return this.recipeComponents.concat(this.resourceComponents).concat(this.primeComponents);
  }

  getImageUrl(): string {
    return WarframeObject.ImageCdnUrl + this.imageName;
  }
}
