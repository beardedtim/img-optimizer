# Img Optimizer

## Overview

This is a server that will optimize images by compressing them and converting them
ON THE FLY and caching the results.

## Local Dev

> You will need to log into AWS via the CLI before you can use this.
>
> You will also need to set the `CACHE_BUCKET` value inside of `.env` to the bucket
> you want to use as your cache.

Run the following scripts.

- `yarn`
  - This will intstall the deps
- `yarn dev`
  - This will start the server locally

## Usage

Once you have it spun up, you can hit the following routes

- `http://localhost:5000/?quality=50&url=https%3A%2F%2Fmedia4.s-nbcnews.com%2Fj%2Fnewscms%2F2020_07%2F3226951%2F200211-bernie-sanders-campaign-win-ew-1145p_36ea1cf782d87fd182d7c61c26e5299b.fit-760w.jpg&width=500&height=250&fit=inside`
  - This would do the following
    - request the image from `https://media4.s-nbcnews.com/j/newscms/2020_07/3226951/200211-bernie-sanders-campaign-win-ew-1145p_36ea1cf782d87fd182d7c61c26e5299b.fit-760w.jpg`
    - put it down to 50% quality
    - make it 500 px wide
    - make it 250px tall
    - make the dimensions fit inside of the 500x250 box we created
