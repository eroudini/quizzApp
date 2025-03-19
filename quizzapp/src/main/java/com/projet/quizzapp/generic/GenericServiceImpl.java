package com.projet.quizzapp.generic;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@RequiredArgsConstructor
public abstract class GenericServiceImpl<
        E extends BaseEntity,
        D extends BaseDto,
        R extends JpaRepository<E,Long>,
        M extends GenericMapper<D,E>>
        implements GenericService<D> {
    protected final R repository;
    protected final M mapper;


    @Override
    public Page<D> findAll(Pageable pageable) {
        return repository.findAll(pageable).map(this::toDto);
    }

    @Override
    public D saveOrUpdate(D dto) {
        return toDto(repository.saveAndFlush(toEntity(dto)));
    }

    @Override
    public Optional<D> findById(long id) {
        return repository.findById(id).map(this::toDto);
    }

    @Override
    public void deleteById(long id) {
        repository.deleteById(id);
    }


    protected D toDto(E entity) {
        return mapper.toDto(entity);
    }

    protected E toEntity(D dto) {
        return mapper.toEntity(dto);
    }

}
