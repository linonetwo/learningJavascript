import fetch from 'node-fetch';
import cheerio from 'cheerio';
import poll from 'when/poll';
import { map } from 'when';
import uuid from 'node-uuid';
import url from 'url';
import { flatten } from 'lodash';
import fs from 'fs-transaction';
const { writeFile } = fs;
console.log(writeFile);

async function getBlogList(site) {
  const res = await fetch(site, {
    method: 'GET',
    mode: 'no-cors'
  });
  const $ = cheerio.load(await (res.text()));
  const list = [];
  $('li').each((i, elem) => {
    list[i] = url.resolve(site, $(elem).children('a').attr('href'));
  });
  console.log(list);
  return list;
}

async function getSection(postLink) {
  const res = await fetch(postLink, {
    method: 'GET',
    mode: 'no-cors'
  });
  const $ = cheerio.load(await (res.text()));
  const postDOM = $('section.post');
  const time = await postDOM.children('h1').children('div').text();
  const header = await postDOM.children('h1').text();
  const sections = [];
  postDOM.find('p').each((i, elem) => {
    sections[i] = $(elem).text();
  });

  const section = sections.join('\n\n');

  return {
    time,
    header,
    sections,
    section
  };
}

async function getParticiple(text) {
  const res = await fetch('http://localhost:8080/participle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  const { participleResult, keywords } = await res.json();
  return keywords;
}

async function asyncGetBlogKeyWords(blogURL) {
  const postURLList = await getBlogList(blogURL);
  const keyWordList = [];
  for (const postURL of postURLList) {
    const { header, section } = await getSection(postURL);
    console.info('dealing with' + header);
    const keywords = await getParticiple(section);
    keyWordList.push(keywords.split('#'));
  }
  const result = '# KeyWords\n\n' + flatten(keyWordList).join(' ,');
  await writeFile('result.md', result);
  console.info('finished');
}

asyncGetBlogKeyWords();
