import uuid from "uuid";

enum Position {
  EAST = "e",
  WEST = "w",
  NORTH = "n",
  SOUTH = "s",
  NORTH_EAST = "ne",
  NORTH_WEST = "nw",
  SOUTH_EAST = "se",
  SOUTH_WEST = "sw",
  CENTER = "c",
}

interface DorkRenderer {
  print(text: string): void;
  prompt(text: string): Promise<string>;
}

export class DorkEntity {
  private config: any;
  public id?: string;
  public parent?: DorkEntity;
  public children?: DorkEntity[] = [];
  constructor(config: any) {
    this.config = config;
    this.id = config.id || undefined;
  }
  describe(): string {
    return this.config.description;
  }
  static fromConfig(config: any) {
    switch (config.type) {
      case "location":
        return new DorkLocation(config);
      case "item":
        return new DorkItem(config);
      default:
        return new DorkEntity(config);
    }
  }
}

export class DorkPlayer {
  public location: DorkLocation;
  public position: Position;
  public facing: Position;
  constructor(location: DorkLocation, position: Position, facing: Position) {
    this.location = location;
    this.position = position;
    this.facing = facing;
  }
}

export class DorkLocation extends DorkEntity {}
export class DorkItem extends DorkEntity {
  public position: Position;
  constructor(config: any) {
    super(config);
    this.position = config.position || Position.CENTER;
  }
}

export class CLI implements DorkRenderer {
  constructor() {}
  print(text: string) {
    console.log("PRINT:", text);
  }
  async prompt(text: string): Promise<string> {
    return "";
  }
}

export class DorkEngine {
  private renderer: DorkRenderer;
  private entities: Record<string, DorkEntity> = {};
  private player: DorkPlayer;
  constructor(config: any) {
    this.loadEntities(config.entities);
    this.player = new DorkPlayer(
      this.entities[config.player.location],
      config.player.position,
      config.player.facing
    );
    this.renderer = new CLI();
  }
  loadEntities(configEntities: any[], parent?: DorkEntity): DorkEntity[] {
    const entities: DorkEntity[] = [];
    configEntities.forEach((entityConfig: any) => {
      if (entityConfig.id === undefined) {
        entityConfig.id = uuid.v4();
      }
      const entity = DorkEntity.fromConfig(entityConfig);
      if (parent) {
        entity.parent = parent;
      }
      entities.push(entity);
      if (entityConfig.entities) {
        entity.children = this.loadEntities(entityConfig.entities, entity);
      }
      this.entities[entityConfig.id] = entity;
    });
    return entities;
  }
  printState() {
    this.renderer.print("you are in " + this.player.location.describe());
  }
  run(): Promise<void> {
    this.printState();
    return Promise.resolve();
  }
}
