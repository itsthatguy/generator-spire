# Spire

## What is Spire?

Spire is a tool that uses [yeoman](http://yeoman.io/) to generate various starting points (folders, files, tools, etc..) for front-end projects. Rather than building a new project from scratch, every time, it's helpful to have a set of sensible defaults to then build from. This generates those defaults which I've found most useful across multiple projects.

## Getting Started

### Setup

```bash
npm install -g yo
npm install -g generator-spire
```

#### Setup for developing generator-spire

If you want to help contribute to the development of this generator, follow the setup below.

```bash
npm install -g yo
# Create a generator-spire fork of your own, on github
git clone git@github.com:<YOUR GITHUB USER>/generator-spire.git
cd generator-spire

# npm link will connect the generator-spire folder to your global
# packages, so that you can then use this version of `yo spire`
npm link

# You're now done in the 'generator-spire' folder, and can `cd` the hell out!
```

### Finally, using the generator:

Create a directory for the project that you will generate into

```bash
mkdir <your_project>
cd <your_project>
yo spire
# Open the README.md for the project that you just generated
```

### Updating Spire

To update Spire simply run the command below.

```bash
npm install -g generator-spire
```

That's it, you have the latest version of Spire.
