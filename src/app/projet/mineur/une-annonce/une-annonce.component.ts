import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-une-annonce',
  templateUrl: './une-annonce.component.html',
  styleUrls: ['./une-annonce.component.css']
})
export class UneAnnonceComponent implements OnInit {

  images: any[];

    get activeIndex(): number {
        return this._activeIndex;
    }

    set activeIndex(newValue) {
        if (this.images && 0 <= newValue && newValue <= (this.images.length - 1)) {
            this._activeIndex = newValue;
        }
    }

    _activeIndex: number = 2;

    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor( ) { }

    ngOnInit() {
  this.images =[
    {
        "previewImageSrc": "assets/demo/images/v.jpg",
        "thumbnailImageSrc": "assets/demo/images/v.jpg",
        "alt": "Description for Image 1",
        "title": "Title 1"
    },
    {
        "previewImageSrc": "assets/demo/images/v.jpg",
        "thumbnailImageSrc": "assets/demo/images/v.jpg",
        "alt": "Description for Image 2",
        "title": "Title 2"
    },
    {
        "previewImageSrc": "assets/demo/images/v.jpg",
        "thumbnailImageSrc": "assets/demo/images/v.jpg",
        "alt": "Description for Image 3",
        "title": "Title 3"
    }
];
    }

    next() {
        this.activeIndex++;
    }

    prev() {
        this.activeIndex--;
    }
}
