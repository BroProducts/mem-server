const { FuseBox } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js"
});

fuse.bundle("server/bundle")
    .watch("**") // watch only server related code.. bugs up atm
    .instructions(" > [index.ts]")
    // Execute process right after bundling is completed
    // launch and restart express
    .completed(proc => proc.start())


fuse.run();