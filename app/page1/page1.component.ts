import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ace from 'ace-builds'; // ace module ..
// language package, choose your own
import 'ace-builds/src-noconflict/mode-javascript';
// ui-theme package
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
const THEME = 'ace/theme/github';
const LANG = 'ace/mode/javascript';
import {data} from '../data';
import { lang} from '../lang';
import * as lang2 from '../language.json';
import {ApiConnectionService} from '../api-connection.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  showOutput:boolean = false;
  dataExport = {};
  output = 'No Content';
  langs = [
    new lang('java','Java JDK 9.0.1', '1'),
    new lang('java','Java JDK 10.0.1', '1'),
    new lang('java','Java JDK 10.0.1', '1'),
  ];

  @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
    private codeEditor: ace.Ace.Editor;
    private editorBeautify;
  constructor(private ApiConnect: ApiConnectionService,private dataReturn:data) { }

  ngOnInit() {
  console.log(lang2.default);
  //this.ApiConnect.SendData().subscribe((data)=>{console.log(data)})

    ace.require('ace/ext/language_tools');
        const element = this.codeEditorElmRef.nativeElement;
        const editorOptions = this.getEditorOptions();

        this.codeEditor = ace.edit(element, editorOptions);
        this.codeEditor.setTheme(THEME);
        this.codeEditor.getSession().setMode(LANG);
        this.codeEditor.setShowFoldWidgets(true);
        this.editorBeautify = ace.require('ace/ext/beautify');
}
private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
  const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 14,
      maxLines: Infinity,
  };

  const extraEditorOptions = {
      enableBasicAutocompletion: true
  };
  const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
  return margedOptions;
}
public beautifyContent() {
  if (this.codeEditor && this.editorBeautify) {
     const session = this.codeEditor.getSession();
     this.editorBeautify.beautify(session);
  }
}
public getCode( Languagevalue: string,Code: string) {
    const splitString = Languagevalue.split(" ");

    const code = this.codeEditor.getValue();
    this.dataReturn.script = code;
    this.dataReturn.language = splitString[0];
    this.dataReturn.versionIndex = splitString[1];
    console.log(this.dataReturn);
    console.log(code);
    this.ApiConnect.SendData(this.dataReturn).subscribe((data)=>{
      this.showOutput = true;
      this.output = data.output;
      console.log(data.output)})

  }
  public getContent() {
    if (this.codeEditor) {
        const code = this.codeEditor.getValue();
        return code;
    }
  }

  /**
  * @param content - set as the editor's content.
  */
public setContent(content: string): void {
  if (this.codeEditor) {
      this.codeEditor.setValue(content);
  }
}


 /**
     * @event OnContentChange - a proxy event to Ace 'change' event - adding additional data.
     * @param callback - recive the corrent content and 'change' event's original parameter.
     */
    public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
      this.codeEditor.on('change', (delta) => {
          const content = this.codeEditor.getValue();
          callback(content, delta);
      });
  }

}
