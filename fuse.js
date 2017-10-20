const { FuseBox } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js"
});

fuse.bundle("server/bundle") // watch only server related code.. bugs up atm
    .instructions(" > [index.ts]")
    
fuse.run();