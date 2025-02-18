/*
 * Licensed to Laurent Broudoux (the "Author") under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. Author licenses this
 * file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { markdownConverter } from 'src/app/components/markdown';

@Component({
  selector: 'doc-page',
  templateUrl: './doc.page.html',
  styleUrls: ['./doc.page.css'],
})
export class DocumentationPageComponent implements OnInit {
  title: string;
  doc: Observable<string>;
  resolvedDoc: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.doc = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.title = params.get('page');
        return this.http.get('/documentation/' + params.get('page') + '.md', {
          responseType: 'text',
        });
      })
    );

    this.doc.subscribe((result) => {
      this.resolvedDoc = result;
    });
  }

  renderTitle(): string {
    let title = this.title.replace(/-/g, ' ');
    return title[0].toUpperCase() + title.substr(1).toLowerCase();
  }

  renderDoc(): string {
    let html = markdownConverter.makeHtml(this.resolvedDoc);

    //html = html.replace(/<code class="hljs language-hljs">((.*|\n)*)<\/code>/gm, '<code [highlight]="$1"></code>');

    return html;
  }
}
