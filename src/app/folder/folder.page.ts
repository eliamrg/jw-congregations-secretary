import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public permisionMissing!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.permisionMissing = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
