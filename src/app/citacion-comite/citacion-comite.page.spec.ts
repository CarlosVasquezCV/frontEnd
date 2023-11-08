import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitacionComitePage } from './citacion-comite.page';

describe('CitacionComitePage', () => {
  let component: CitacionComitePage;
  let fixture: ComponentFixture<CitacionComitePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CitacionComitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
