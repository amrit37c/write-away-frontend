import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"],
})
export class EditorComponent implements OnInit {
  public Editor = ClassicEditor;
  content: any;
  placeholderText: string = "";

  @Input() data;

  @Output() editorContent = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    this.content = this.data;
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.editorContent.emit(data);
  }
}
