import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MarkdownIt from 'markdown-it'
import twemoji from 'twemoji'
import emoji from 'markdown-it-emoji'
import styles from './add.less';
import imsize from 'markdown-it-imsize'
import _ from 'lodash'
import { connect } from 'dva';
import { Button, Input, Select, Icon } from 'antd'
import request from '@/utils/request';
const text = `---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png =200x200)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
`
@connect(({ global }) => ({
  global
}))
export default class add extends Component {
  constructor(props) {
    super(props)
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    });
    this.md.use(emoji)
    this.md.use(imsize, { autofill: true })
    this.md.renderer.rules.emoji = function (token, idx) {
      return twemoji.parse(token[idx].content);
    };
    this.state = {
      result: "",
      title:"",
      tags:"",
      content:""
    }
  }
  componentDidMount = () => {
    const { dispatch,location } = this.props;
    console.log(this.props)

    let {state} = location;
    if(state){
      let result = this.md.render(state.record.content);
      this.setState({...state.record,result:result})
      request("/tags/getByPage",{
        method:"POST",
        body:{
          ...state.record
        }
      }).then(res=>{
        let tag= []
        if(res.data){
          res.data.map(item=>{
            tag.push(item.name)
          })
        }
        this.setState({tags:tag})
        console.log(tag)
})
    }

  }
  componentWillUnmount = () => {
    const { dispatch } = this.props;

  }
  handleScroll = (type, env) => {
    switch (type) {
      case "edit":
        this.refs.view.scrollTop = this.refs.edit.scrollTop;
        break;
      case "view":
        this.refs.edit.scrollTop = this.refs.view.scrollTop;
        break;
    }
  }
  //编辑
  handleEdit = () => {
    this.setState({content:this.refs.edit.value})
    let result = this.md.render(this.refs.edit.value);
    this.setState({ result: result })
  }
  handleChange = (type,args)=>{
    let state = this.state;
    state[type]=args
    this.setState(state)
  }
  //提交数据
  handleSubmit=()=>{
    let param = {...this.state};
    let tags = param.tags;
    delete param.tags
    delete param.result
    delete param.update_time
    request("/page/add",{
      method:"POST",
      body:{
        page:{
          ...param
        },
        tags:tags
      }
    })
  }
  render() {
    const children = [];
    console.log(this.state)

    const {content} = this.state;
    return (
      <div className={styles.box}>
        <div className={styles.toolsbar}>
          <span style={{ display: "flex",alignItems:"center",marginRight:"40px" }} className={styles.title}>
            <div style={{width:"75px"}}> 标题 : </div>
            <input value={this.state.title} onChange={(e)=>{
              this.handleChange("title",e.target.value)}}/>
          </span>
          <span style={{ display: "flex", }} className={styles.title}>
            <div style={{width:"75px"}}> 分类 : </div>
          </span>
          <span className={styles.tags}>

            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Please select"
              value={this.state.tags}
              onChange={this.handleChange.bind(this,"tags")}
            >
              {children}
            </Select>
          </span>
          {/* <Button icon="save"></Button> */}
          {/* <Button icon="save" ></Button> */}
          {/* <Button icon="save" ></Button>
      <Button icon="save" ></Button>
      <Button icon="save" ></Button>
      <Button icon="save" ></Button>
      <Button icon="save" ></Button> */}
          <Button icon="save" onClick={this.handleSubmit} ></Button>
        </div>
        <div className={styles.container}>

          <div className={styles.editer} >
            <textarea ref="edit"
            value={this.state.content}
              onScroll={_.throttle(this.handleScroll.bind(this, "edit"), 10)}
              defaultValue={content} className={styles.editPanel}
              onChange={_.throttle(this.handleEdit)}
            />
          </div>
          <div ref="view" className={styles.viewer} onScroll={_.throttle(this.handleScroll.bind(this, "view"), 10)} dangerouslySetInnerHTML={{ __html: this.state.result }} >

          </div>
        </div>

      </div>

    )
  }
}
