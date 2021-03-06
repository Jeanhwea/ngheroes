import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private rt: ActivatedRoute,
    private hs: HeroService,
    private loc: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.rt.snapshot.paramMap.get('id');
    this.hs.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.loc.back();
  }

  save(): void {
    this.hs.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
