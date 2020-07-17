# Keyword Counter (Custom Block for Airtable)

Set keywords for each record in an [Airtable](https://airtable.com) base and see how those keywords are used in text.

Use this block when drafting or reviewing text for 
- search engine optimization
- essays with vocabulary words
- sentences with spelling words

## Inspiration

A friend in a start-up company was telling me about writing text for his product and the difficulty of crafting quality content, 
while also including keywords for search engine optimization and managing character counts.
A tool to automatically track keyword usage and other statistics would let him focus on making the content appeal to human readers.

His process reminded me of how I used to composed sentences with spelling words to dictate to my language arts students. 
Trying to cram up to twenty spelling words in five original sentences every day for years was a mental workout. 
At least those sentences didn't have to fit together! I also assigned my students vocabulary words to use in compositions. 
A tool to automatically highlight those vocabulary words would have made grading those compositions much easier.

## What this Block Does

You configure the block for a pair of fields in an Airtable base: 
- one field for the text content, and 
- another field with a list of keywords. 

As you work with a record, the block shows which keywords exist in the text content, 
including a count of how many times each keyword appears and a color-coded view of the text with each keyword highlighted.

## How to remix this block

1. Create a new base (or you can use an existing base).

2. Create a new block in your base (see [Create a new block](https://airtable.com/developers/blocks/guides/hello-world-tutorial#create-a-new-block),
   selecting "Remix from Github" as your template.

3. From the root of your new block, run `block run`.
