import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosPage } from './documentos.page';

describe('DocumentosPage', () => {
  let component: DocumentosPage;
  let fixture: ComponentFixture<DocumentosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocumentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
