package ad.ya.contacts.generic;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
public abstract class GenericController<D extends BaseDto, S extends GenericService<D>> {
    protected S service;


    @GetMapping
    public ResponseEntity<Page<D>> findAll(Pageable pageable) {
        Page<D> page = service.findAll(pageable);
        return page.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(page);
    }

    @GetMapping("{id}")
    public ResponseEntity<D> getById(@PathVariable long id) {
        return ResponseEntity.of(service.findById(id));
    }


    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<D> saveOrUpdate(@RequestBody D dto) {
        return ResponseEntity
                .status(dto.getId() == 0 ? HttpStatus.CREATED : HttpStatus.OK)
                .body(service.saveOrUpdate(dto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("{id}")
    public void deleteById(@PathVariable long id) {
        service.deleteById(id);
    }
}
