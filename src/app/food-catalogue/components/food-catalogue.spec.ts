import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-food-catalogue',
  template: ''
})
class FoodCatalogue {}

describe('FoodCatalogue', () => {
  let component: FoodCatalogue;
  let fixture: ComponentFixture<FoodCatalogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodCatalogue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodCatalogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
