interface Image {
  url: string;
}

export interface Blog {
  data: Blog | null;
  id: number;
  title: string;
  content: string;
  image: Image;
}
