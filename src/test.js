class Post {
  text;
  constructor(text) {
    this.text = text;
  }

  print() {
    console.log(this.text);
  }
}

const post = new Post('Hello, World!');
console.log(post.text);
