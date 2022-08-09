import uuid from "uuid";

type SightCone = Array<Position>;

enum FacingPosition {
  EAST = "e",
  WEST = "w",
  NORTH = "n",
  SOUTH = "s",
  NORTH_EAST = "ne",
  NORTH_WEST = "nw",
  SOUTH_EAST = "se",
  SOUTH_WEST = "sw"
}

enum CenterPosition {
  CENTER = "c",
}

type Position = FacingPosition | CenterPosition;

function calculateSight(position: Position, facing: FacingPosition): SightCone {
  const Pos = { ...FacingPosition, ...CenterPosition };

  switch (position) {
    case Pos.NORTH_EAST:
    case Pos.NORTH_WEST:
    case Pos.SOUTH_WEST:
    case Pos.SOUTH_WEST:
      throw new Error("Unimplemented position")
    case Pos.CENTER:
      switch (facing) {
        case Pos.EAST:
          return [Pos.CENTER, Pos.EAST, Pos.NORTH_EAST, Pos.SOUTH_EAST];
        case Pos.WEST:
          return [Pos.CENTER, Pos.WEST, Pos.NORTH_WEST, Pos.SOUTH_WEST];
        case Pos.NORTH:
          return [Pos.CENTER, Pos.NORTH, Pos.NORTH_EAST, Pos.NORTH_WEST];
        case Pos.SOUTH:
          return [Pos.CENTER, Pos.SOUTH, Pos.SOUTH_EAST, Pos.SOUTH_WEST];
        case Pos.NORTH_EAST:
          return [Pos.CENTER, Pos.NORTH, Pos.EAST, Pos.NORTH_EAST];
        case Pos.NORTH_WEST:
          return [Pos.CENTER, Pos.NORTH, Pos.WEST, Pos.NORTH_WEST];
        case Pos.SOUTH_EAST:
          return [Pos.CENTER, Pos.SOUTH, Pos.EAST, Pos.SOUTH_EAST];
        case Pos.SOUTH_WEST:
          return [Pos.CENTER, Pos.SOUTH, Pos.WEST, Pos.SOUTH_WEST];
      }

      case Pos.NORTH:
        switch (facing) {
          case Pos.EAST:
            return [Pos.NORTH, Pos.NORTH_EAST, Pos.CENTER, Pos.EAST, Pos.SOUTH, Pos.SOUTH_EAST];
          case Pos.WEST:
            return [Pos.NORTH, Pos.NORTH_WEST, Pos.CENTER, Pos.WEST, Pos.SOUTH, Pos.SOUTH_WEST];
          case Pos.NORTH:
            return [Pos.NORTH]; 
          case Pos.SOUTH:
            return [Pos.NORTH, Pos.CENTER, Pos.SOUTH, Pos.SOUTH_WEST, Pos.SOUTH_WEST, Pos.EAST, Pos.WEST]
          case Pos.NORTH_EAST:
            return [Pos.NORTH, Pos.NORTH_EAST, Pos.EAST]
          case Pos.NORTH_WEST:
             return [Pos.NORTH, Pos.NORTH_WEST, Pos.WEST] 
          case Pos.SOUTH_EAST:
             return [Pos.NORTH, Pos.NORTH_EAST, Pos.CENTER, Pos.EAST, Pos.SOUTH, Pos.SOUTH_EAST]
          case Pos.SOUTH_WEST:
            return [Pos.NORTH, Pos.NORTH_WEST, Pos.WEST, Pos.CENTER, Pos.SOUTH_WEST, Pos.SOUTH]
        }

      case Pos.SOUTH:
        switch (facing) {
          case Pos.EAST:
            return [Pos.SOUTH, Pos.SOUTH_EAST, Pos.CENTER, Pos.EAST, Pos.NORTH, Pos.NORTH_EAST]
          case Pos.WEST:
            return [Pos.SOUTH, Pos.SOUTH_WEST, Pos.CENTER, Pos.WEST, Pos.NORTH, Pos.NORTH_WEST]
          case Pos.NORTH:
            return [Pos.SOUTH, Pos.CENTER, Pos.NORTH, Pos.NORTH_EAST, Pos.NORTH_WEST, Pos.WEST, Pos.EAST]
          case Pos.SOUTH:
            return [Pos.SOUTH]
          case Pos.NORTH_EAST:
            return [Pos.SOUTH, Pos.SOUTH_EAST, Pos.CENTER, Pos.EAST, Pos.NORTH, Pos.NORTH_EAST]
          case Pos.NORTH_WEST:
            return [Pos.SOUTH, Pos.SOUTH_WEST, Pos.CENTER, Pos.WEST, Pos.NORTH, Pos.NORTH_WEST]
          case Pos.SOUTH_EAST:
            return [Pos.SOUTH, Pos.SOUTH_EAST, Pos.EAST]
          case Pos.SOUTH_WEST:
            return [Pos.SOUTH, Pos.SOUTH_WEST, Pos.WEST]
        }

      case Pos.WEST:
        switch (facing) {
          case Pos.EAST:
            return [Pos.WEST, Pos.CENTER, Pos.EAST, Pos.NORTH, Pos.SOUTH, Pos.NORTH_EAST, Pos.SOUTH_EAST]
          case Pos.WEST:
            return [Pos.WEST]
          case Pos.NORTH:
            return [Pos.WEST, Pos.CENTER, Pos.EAST, Pos.NORTH_WEST, Pos.NORTH, Pos.NORTH_EAST]
          case Pos.SOUTH:
            return [Pos.WEST, Pos.SOUTH_WEST, Pos.CENTER, Pos.SOUTH, Pos.EAST, Pos.SOUTH_EAST]
          case Pos.NORTH_EAST:
            return [Pos.WEST, Pos.CENTER, Pos.EAST, Pos.NORTH_WEST, Pos.NORTH, Pos.NORTH_EAST]
          case Pos.NORTH_WEST:
            return [Pos.WEST, Pos.NORTH_WEST, Pos.NORTH]
          case Pos.SOUTH_EAST:
            return [Pos.WEST, Pos.SOUTH_WEST, Pos.CENTER, Pos.SOUTH, Pos.EAST, Pos.SOUTH_EAST]
          case Pos.SOUTH_WEST:
            return [Pos.WEST, Pos.SOUTH_WEST, Pos.SOUTH]
        }

      case Pos.EAST:
        switch (facing) {
          case Pos.EAST:
            return [Pos.EAST]
          case Pos.WEST:
            return [Pos.EAST, Pos.CENTER, Pos.WEST, Pos.NORTH, Pos.SOUTH, Pos.NORTH_WEST, Pos.SOUTH_WEST]
          case Pos.NORTH:
            return [Pos.EAST, Pos.CENTER, Pos.WEST, Pos.NORTH_WEST, Pos.NORTH, Pos.NORTH_EAST]
          case Pos.SOUTH:
            return [Pos.EAST, Pos.CENTER, Pos.WEST, Pos.SOUTH_EAST, Pos.SOUTH, Pos.SOUTH_WEST]
          case Pos.NORTH_EAST:
            return [Pos.EAST, Pos.NORTH, Pos.NORTH_EAST]
          case Pos.NORTH_WEST:
            return [Pos.EAST, Pos.CENTER, Pos.WEST, Pos.NORTH_EAST, Pos.NORTH, Pos.NORTH_WEST]
          case Pos.SOUTH_EAST:
            return [Pos.SOUTH_EAST, Pos.EAST, Pos.SOUTH]
          case Pos.SOUTH_WEST:
            return [Pos.EAST, Pos.CENTER, Pos.WEST, Pos.NORTH_WEST, Pos.NORTH, Pos.NORTH_EAST]
        }

    default:
      throw new Error("Default path")
  }
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
  public facing: FacingPosition;
  constructor(location: DorkLocation, position: Position, facing: FacingPosition) {
    this.location = location;
    this.position = position;
    this.facing = facing;
  }
  public visibleObjects(): DorkEntity[] {
    const visibleSquares = calculateSight(this.position, this.facing);
    const visibleObjects = this.location.children?.filter((child) => {
      if (child instanceof DorkPositional) {
        return visibleSquares.includes(child.position)
      } else {
        return false
      }
    }) ?? [];
    return visibleObjects
  }
}

export class DorkLocation extends DorkEntity {}

export class DorkPositional extends DorkEntity {
  public position: Position;
  constructor(config: any) {
    super(config);
    this.position = config.position || CenterPosition.CENTER;
  }
}

export class DorkItem extends DorkPositional {}

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
